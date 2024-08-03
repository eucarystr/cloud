require 'rails_helper'

RSpec.describe Project, type: :model do
  it "is not valid without a title" do
    project = Project.new(description: "A description", status: "Pending")
    expect(project).to_not be_valid
  end

  it "is not valid without a description" do
    project = Project.new(title: "A title", status: "Pending")
    expect(project).to_not be_valid
  end

  it "is not valid without a status" do
    project = Project.new(title: "A title", description: "A description")
    expect(project).to_not be_valid
  end
end
