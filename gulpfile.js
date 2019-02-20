const { series, src, dest } = require('gulp');
const flatMap = require('flat-map').default
const scaleImages = require('gulp-scale-images')
const imagemin = require('gulp-imagemin');
const dms2dec =  require('dms2dec')
const ExifImage = require('exif').ExifImage;
const globby = require('globby');
const util = require('util');

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
          path: image,
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
  const promises = paths.map((path) => {
    return getImageDataFromImage(path)
  })

  let results = Promise.all(promises)
  await results
}


// Conversion of HEIC
// 'for file in *.HEIC; do convert $file -profile 'prof.icc' "`basename $file |  cut -f 1 -d '.'`.jpg"; done'

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

exports.exif = getImageData;
exports.default = series(scale, optimize);
