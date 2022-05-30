class Review < ApplicationRecord
  belongs_to :reviewee
  belongs_to :reviewer
end
