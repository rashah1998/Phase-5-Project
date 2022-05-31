class SessionsController < ApplicationController
    wrap_parameters format: []

    def login
        user = User.find_by(username:session_params[:username])
        if user
            if user.authenticate(session_params[:password])
                session[:current_user] = user.id 
                render json: user
            else
                render json: {error: "Invalid Password"}, status: :unauthorized
            end
        else
            render json: {error: "User not found"}, status: :not_found 
        end
    end

    def logout
        session.delete :current_user
    end

    private

    def session_params
        params.permit(:username, :password)
    end
end