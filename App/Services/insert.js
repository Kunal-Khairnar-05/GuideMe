import { request, gql } from 'graphql-request';

const MASTER_URL = "https://api-ap-south-1.hygraph.com/v2/cltvdsiy503kn07uxq8zqlsnn/master"

const CREATE_COURSE = gql`
  mutation CreateCourse($data: CreateCourseInput!) {
    createCourse(data: $data) {
      name
      price
      time
      instructor
      description {
        markdown
      }
      banner {
        url
      }
    }
  }
`;

export const createCourse = async (courseData) => {
  try {
    const result = await request(MASTER_URL, CREATE_COURSE, { data: courseData });
    console.log("Course created:", result.createCourse);
    return result.createCourse; // Return the created course data
  } catch (error) {
    console.error('Error creating course:', error);
    // Handle errors appropriately (e.g., display an error message)
  }
};