const categoryRepository = require("../repositories/category.repository");
const ServiceResponse = require("..models/serviceResponse");
const CategoryDto = require("../dtos/category.dto");

class CategoryService {
  async getAllCategory() {
    const response = new ServiceResponse();

    const categories = await categoryRepository.getAll();

    if (categories && categories.length > 0) {
      const categoriesDto = categories.map(
        category => new CategoryDto(category)
      );

      response.data = categoriesDto;
      response.success = true;
      response.message = "Categories retrieved successfully";
    } else {
      response.success = false;
      response.message = "No record found!";
    }

    return response;
  }
}

module.exports = new CategoryService();
