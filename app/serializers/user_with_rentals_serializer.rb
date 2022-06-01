class UserWithRentalsSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :username, :password_digest, :city, :state, :rating, :admin, :items, :rentals

  def items 
    ActiveModelSerializers::SerializableResource.new(object.items, each_serializer: ItemWithRentalsSerializer)
  end

  def rentals 
    ActiveModelSerializers::SerializableResource.new(object.rentals, each_serializer: RentalWithItemOwnerSerializer)
  end
end
