require "test_helper"

class ProjectTest < ActiveSupport::TestCase
  test "should not save project without title" do
    project = Project.new(description: "A description")
    assert_not project.save, "Saved the project without a title"
  end

  test "should not save project without description" do
    project = Project.new(title: "A title")
    assert_not project.save, "Saved the project without a description"
  end

  test "should not save project without status" do
    project = Project.new(title: "A title", description: "A description")
    assert_not project.save, "Saved the project without a status"
  end
end
