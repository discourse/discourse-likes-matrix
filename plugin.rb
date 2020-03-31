# frozen_string_literal: true

# name: discourse-likes-matrix
# about: What kind of discourser are you?
# version: 0.1
# authors: joffre jaffeux
# url: https://github.com/jjaffeux

register_asset 'stylesheets/common/discourse-likes-matrix.scss'

enabled_site_setting :discourse_likes_matrix_enabled

PLUGIN_NAME ||= 'DiscourseLikesMatrix'

after_initialize do
  module ::DiscourseLikesMatrix
    class Engine < ::Rails::Engine
      engine_name 'discourse-likes-matrix'
      isolate_namespace DiscourseLikesMatrix
    end
  end

  require File.expand_path("../app/serializers/discourse_likes_matrix/matrix_user_serializer.rb", __FILE__)
  require File.expand_path("../app/controllers/discourse_likes_matrix/discourse_likes_matrix_controller.rb", __FILE__)

  DiscourseLikesMatrix::Engine.routes.draw do
    get "/likes-matrix" => "discourse_likes_matrix#index"
  end

  Discourse::Application.routes.append do
    mount ::DiscourseLikesMatrix::Engine, at: '/'
  end
end
