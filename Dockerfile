FROM nginx:1.10.1-alpine@sha256:dabd1d182f12e2a7d372338dfd0cde303ef042a6ba01cc829ef464982f9c9e2c 
COPY weatherApp/index.html /usr/share/nginx/html/
COPY weatherApp/app.js /usr/share/nginx/html/
COPY weatherApp/custom.css /usr/share/nginx/html/


# documentation
# EXPOSE 8080

# CMD [ "nginx " , "-g","daemon off ;" ]


