FROM nginx:1.10.1-alpine 
COPY weatherApp/index.html /usr/share/nginx/html/
COPY weatherApp/app.js /usr/share/nginx/html/
COPY weatherApp/custom.css /usr/share/nginx/html/


# documentation
# EXPOSE 8080

# CMD [ "nginx " , "-g","daemon off ;" ]


