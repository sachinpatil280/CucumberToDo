# Base image taken from https://github.com/cypress-io/cypress-docker-images/
FROM cypress/browsers:node14.17.0-chrome91-ff89
# Create a folder which will have our project
RUN mkdir /gelato
# Define work directory
WORKDIR /gelato
# Copy essential files to run out scripts
COPY ./package.json .
COPY ./cypress.json .
COPY ./package-lock.json .
COPY ./cypress ./cypress
# Install cypress dependencies in work directory
RUN npm ci
# check if the binary was installed successfully
RUN $(npm bin)/cypress verify
# Execute the commands the container will use [Exec From]
ENTRYPOINT [ "npx", "cypress", "run" ]
# With CMD in this case, we can specify more parameters to the last entrypoint
CMD [ "" ]