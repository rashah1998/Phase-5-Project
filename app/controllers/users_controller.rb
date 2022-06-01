class UsersController < ApplicationController
    def show
        current_user = User.find(session[:current_user])
        render json: current_user
    end

    def show_rentals
        current_user = User.find(session[:current_user])
        render json: current_user, serializer: UserWithRentalsSerializer
    end

    def create
        if User.exists?(username: params[:username])
            render json: {error: 'Username not available. Try a different username.'}, status: :not_acceptable 
        else
            user = User.create!(user_params)
            render json: user, status: :created
        end
    end

    private

    def user_params
        params.permit(:first_name, :last_name, :username, :password)
    end
end
