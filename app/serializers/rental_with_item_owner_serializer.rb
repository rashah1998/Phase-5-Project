class RentalWithItemOwnerSerializer < ActiveModel::Serializer
  attributes :id, :start_date, :end_date, :was_received_by_owner, :was_returned_to_owner, :pending_approval, :item

  def item 
    ActiveModelSerializers::SerializableResource.new(object.item, serializer: ItemWithOwnerSerializer)
  end
end
