
FROM ruby:2.7


WORKDIR /usr/src/app


COPY Gemfile* ./
RUN bundle install


COPY . .


RUN RAILS_ENV=production bundle exec rake assets:precompile
RUN RAILS_ENV=production bundle exec rake db:migrate


CMD ["rails", "server", "-b", "0.0.0.0"]
