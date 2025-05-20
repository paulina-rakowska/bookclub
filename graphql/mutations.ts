import { gql } from "@apollo/client";

export const ADD_BOOK = gql`
	mutation AddBook($title: String, $description: String, $authorId: ID) {
		addBook(title: $title, description: $description, authorId: $authorId) {
			title
            description
			author {
				id
				firstName
                lastName
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