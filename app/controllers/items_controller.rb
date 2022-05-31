class ItemsController < ApplicationController
    def index 
        render json: Item.all
    end

    def show
        item = Item.find(item_params[:id])
        render json: item
    end

    private

    def item_params
        params.permit(:id)
    end
end
