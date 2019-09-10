class FoodsController < ApplicationController

    def index 
        render json: {status: 200, foods: Food.all}
    end

    def show 
        puts params
        food = Food.find(params[:id])
        render json: {status: 200, food: food}
    end

    def create
        food = Food.new(food_params)

        if food.save 
            render json: {status: 201, food: food}
        else 
            render json: {status: 422, song: song}
        end    
    end

    def update
        food = Food.find(params[:id])
        food.update(food_params)
        render json: {status: 200, food: food}
    end

    def destroy
        song = Food.destroy(params[:id])
        render json: {status: 204}
    end

    private 
    def food_params
        params.required(:food).permit(:prod_id, :item, :quantity, :pic, :days_expiration, :location, :nutrifacts )
    end    
end 
