class UsersController < ApplicationController
    def show
        current_user = User.find(session[:current_user])
        render json: current_user
    end
end
