class RentalsController < ApplicationController
    def create
        rental = Rental.create!(rental_params)
        render json: rental, status: :created
    end

    def update
        rental = Rental.find(params[:id])
        rental.update!(rental_params)
        render json: rental, status: :created
    end

    def destroy
        rental = Rental.find(params[:id])
        rental.destroy
    end

    private

    def rental_params
        params.permit(:item_id, :renter_id, :start_date, :end_date, :pending_approval, :was_returned_to_owner, :was_received_by_owner)
    end
end
