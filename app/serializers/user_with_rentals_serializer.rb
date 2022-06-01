class UserWithRentalsSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :username, :password_digest, :city, :state, :rating, :admin, :items, :rentals
  
  def items 
    ActiveModelSerializers::SerializableResource.new(object.items, each_serializer: ItemWithRentalsSerializer)
  end
end
