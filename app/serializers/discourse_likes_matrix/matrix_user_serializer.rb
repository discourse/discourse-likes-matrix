# frozen_string_literal: true

module DiscourseLikesMatrix
  class MatrixUserSerializer < ApplicationSerializer
    attributes :id, :username, :likes_given, :likes_received, :avatar_template

    def likes_received
      object.user_stat.likes_received
    end

    def likes_given
      object.user_stat.likes_given
    end
  end
end
