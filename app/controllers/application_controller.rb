class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordNotFound, with: :not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity_response
  
  include ActionController::Cookies

  private

  def not_found_response(invalid)
    render json: {errors: invalid}, status: :not_found
  end

  def unprocessable_entity_response(invalid)
    render json: {errors: invalid}, status: :unprocessable_entity
  end

end
