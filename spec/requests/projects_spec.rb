require 'rails_helper'

RSpec.describe "Projects", type: :request do
  let(:valid_attributes) {
    { title: 'New Project', description: 'Project Description', status: 'Pending' }
  }

  let(:invalid_attributes) {
    { title: nil, description: 'Project Description', status: 'Pending' }
  }

  describe "GET /projects" do
    it "renders a successful response" do
      get projects_url, as: :json
      expect(response).to be_successful
    end
  end

  describe "POST /projects" do
    context "with valid parameters" do
      it "creates a new Project" do
        expect {
          post projects_url, params: { project: valid_attributes }, as: :json
        }.to change(Project, :count).by(1)
      end

      it "renders a JSON response with the new project" do
        post projects_url, params: { project: valid_attributes }, as: :json
        expect(response).to have_http_status(:created)
      end
    end

    context "with invalid parameters" do
      it "renders a JSON response with errors for the new project" do
        post projects_url, params: { project: invalid_attributes }, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "PATCH /projects/:id" do
    let(:new_attributes) {
      { title: 'Updated Title' }
    }

    it "updates the requested project" do
      project = Project.create! valid_attributes
      patch project_url(project), params: { project: new_attributes }, as: :json
      project.reload
      expect(project.title).to eq('Updated Title')
    end

    it "renders a JSON response with the project" do
      project = Project.create! valid_attributes
      patch project_url(project), params: { project: new_attributes }, as: :json
      expect(response).to have_http_status(:success)
    end
  end

  describe "DELETE /projects/:id" do
    it "destroys the requested project" do
      project = Project.create! valid_attributes
      expect {
        delete project_url(project), as: :json
      }.to change(Project, :count).by(-1)
    end
  end
end
