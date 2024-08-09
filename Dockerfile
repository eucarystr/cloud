# Use an official Ruby runtime as a parent image
FROM ruby:2.7

# Set the working directory
WORKDIR /usr/src/app

# Install dependencies
COPY Gemfile* ./
RUN bundle install

# Copy the rest of the application code
COPY . .

# Precompile assets and run migrations
RUN RAILS_ENV=production bundle exec rake assets:precompile
RUN RAILS_ENV=production bundle exec rake db:migrate

# Start the Rails server
CMD ["rails", "server", "-b", "0.0.0.0"]
