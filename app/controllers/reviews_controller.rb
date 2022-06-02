class ReviewsController < ApplicationController

    def create
        review = Review.create!(review_params)
        reviewee = User.find(review.reviewee_id)
        reviewee.average_rating
        render json: review, status: :created
    end

    private

    def review_params
        params.permit(:rating, :content, :reviewee_id, :reviewer_id)
    end

end
