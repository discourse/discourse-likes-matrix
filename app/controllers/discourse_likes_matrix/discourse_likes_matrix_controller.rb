# frozen_string_literal: true

module DiscourseLikesMatrix
  class DiscourseLikesMatrixController < ::ApplicationController
    requires_plugin DiscourseLikesMatrix

    before_action :ensure_logged_in

    def index
      users = User
        .real
        .not_suspended
        .not_silenced
        .where('username_lower not in (?)', ['bob'])
        .activated
        .limit(100)
        .joins(:user_stat)

      render json: ActiveModel::ArraySerializer.new(
        users,
        each_serializer: MatrixUserSerializer
      ).as_json
    end
  end
end
