FROM node:10.15.3-stretch as builder

# RUN apk add vips-dev fftw-dev build-base --update-cache \
#     --repository https://alpine.global.ssl.fastly.net/alpine/edge/testing/ \
#     --repository https://alpine.global.ssl.fastly.net/alpine/edge/main
# RUN apk add --update nodejs nodejs-npm python

RUN apt-get update && apt-get install -y libvips-dev python libxss1

# Copy our source code into the container
COPY package*.json ./
# Install the dependencies, can be commented out if you're running the same node version
RUN npm install

COPY . .

# run webpack and the vue-loader
RUN npm run build



# ------------------------------------------

FROM alpine:3.9 as server

RUN apk add --update nginx

RUN mkdir -p /tmp/nginx/app
RUN mkdir -p /var/log/nginx
RUN mkdir -p /var/www/html

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/default.conf /etc/nginx/conf.d/default.conf

# Set the directory we want to run the next commands for
WORKDIR /tmp/nginx/app

COPY --from=builder /dist/ /var/www/html/
RUN ls /var/www/html

RUN chown nginx:nginx /var/www/html

# Log to stdout
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
	&& ln -sf /dev/stderr /var/log/nginx/error.log

CMD ["nginx", "-g", "daemon off;"]
