import { gql } from "@apollo/client";

export const ADD_BOOK = gql`
	mutation AddBook($title: String, $description: String, $authorId: ID, $categoryId: ID) {
		addBook(title: $title, description: $description, authorId: $authorId, $categoryId: $categoryId) {
			title
            description
			author {
				id
				firstName
                lastName
			}
			category {
				id
				name
			}
		}
	}
`;

export const ADD_AUTHOR = gql`
	mutation AddAuthor($firstName: String, $lastName: String) {
		addAuthor(firstName: $firstName, lastName: $lastName) {
			id
			firstName
            lastName
			books {
			  id
			}
		}
	}
`;

export const ADD_CATEGORY = gql`
	mutation AddCategory($name: String) {
		addCategory(name: $name) {
			id
			name
		}
	}
`;