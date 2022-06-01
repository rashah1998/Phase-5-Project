class ReviewsController < ApplicationController

    def create
        review = Review.create!(review_params)
        render json: review, status: :created
    end

    private

    def review_params
        params.permit(:rating, :content, :reviewee_id, :reviewer_id)
    end

end
