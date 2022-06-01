class RentalsController < ApplicationController
    def create
        rental = Rental.create!(rental_params)
        render json: rental, status: :created
    end

    private

    def rental_params
        params.permit(:item_id, :renter_id, :start_date, :end_date)
    end
end
