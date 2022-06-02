class User < ApplicationRecord
    has_many :items, foreign_key: :owner_id
    has_many :rentals, foreign_key: :renter_id
    has_many :reviews
    has_many :reviewees, through: :reviews
    has_many :reviewers, through: :reviews
    has_secure_password

    def average_rating
        all_reviews = Review.where(reviewee_id: id)
        sum = 0
        all_reviews.each do |review|
            sum += review.rating
        end
        avg = sum/all_reviews.length
        self.rating = avg
        save
    end
end
