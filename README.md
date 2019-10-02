# adform-pets-service
A microservice that (List Owners, Read/Write Pets, List Pets for an Owner and Log transaction to a file)


# run with npm
npm run start
npm start


# Docker Build
docker build -t [image-tag-name]

i.e.
docker build -t walidf/adform-pets-service .

  
# Docker Run
docker run -p [route_incoming_request_to_port]:[port_inside_the_container] [image-id-or-tagged-name]

i.e.
docker run -p 3000:3000 walidf/adform-pets-service
