const { series, src, dest } = require('gulp');
const flatMap = require('flat-map').default
const scaleImages = require('gulp-scale-images')
const imagemin = require('gulp-imagemin');
const dms2dec =  require('dms2dec')
const ExifImage = require('exif').ExifImage;
const globby = require('globby');
const clean = require('gulp-clean');
const fs = require('fs')
const {compareDesc} = require('date-fns')
const moment = require('moment')
const yamlFront = require('yaml-front-matter');
const path = require('path')


const dateFormat = 'YYYY:MM:DD HH:mm:ss'

const twoVariantsPerFile = (file, cb) => {
    const small = file.clone()
    small.scale = {maxWidth: 700, format: 'jpg'}
    const medium = file.clone()
    medium.scale = {maxWidth: 1200, format: 'jpg'}
    cb(null, [small, medium])
}

const getImageDataFromImage = (image) => {
  return new Promise((resolve) => {
      new ExifImage({ image }, function (error, exifData) {
          let dec
          if(exifData.gps.GPSLatitude) {

          dec = dms2dec(
            exifData.gps.GPSLatitude, exifData.gps.GPSLatitudeRef,
            exifData.gps.GPSLongitude, exifData.gps.GPSLongitudeRef,
          );
        } else {
          dec = [null, null]
        }

        resolve({
          file: path.basename(image),
          date: exifData.exif.DateTimeOriginal,
          description: exifData.image.ImageDescription,
          lat: dec[0],
          lng: dec[1],
          width: exifData.exif.ExifImageWidth,
          height: exifData.exif.ExifImageHeight,
        })
      });
  })
}

const getImageData = async () => {
  const paths = await globby(['photos/originals/*.{jpg,JPG}']);
  const promises = paths.map((p) => {
    return getImageDataFromImage(p)
  })

  let results = await Promise.all(promises)
  results = results.sort((t1, t2) => {
    t1 = moment(t1.date, dateFormat).toDate()
    t2 = moment(t2.date, dateFormat).toDate()
    return compareDesc(t2, t1)
  })
  await fs.writeFile('./photos/index.json', JSON.stringify(results), () => {})
}

// Conversion of HEIC
// 'for file in *.HEIC; do convert $file -profile 'prof.icc' "`basename $file |  cut -f 1 -d '.'`.jpg"; done'

function cleanup(cb) {
  src('photos/optimized', {read: false})
    .pipe(clean());
  cb()
}

function scale(cb) {
  src('photos/originals/*.{jpeg,jpg,png,gif,JPG,JPEG}')
  .pipe(flatMap(twoVariantsPerFile))
  .pipe(scaleImages())
  .pipe(dest('./photos/optimized/'))
  cb();
}

function optimize(cb) {
  src('photos/originals/*')
    .pipe(imagemin())
    .pipe(dest('photos/optimized'))
  cb()
}

const parseStoryFile = async (file) => {
  const contents = await fs.readFile(file)
  const obj = yamlFront.loadFront(contents)
}

async function renderStories() {
  const paths = await globby(['public/stories/*.md']);
}

exports.exif = getImageData;
exports.default = series(cleanup, scale, optimize, getImageData);
