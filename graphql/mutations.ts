import { gql } from "@apollo/client";

export const ADD_BOOK = gql`
	mutation AddBook($title: String, $description: String) {
		addBook(title: $title, description: $description) {
			author {
				id
				firstName
                lastName
			}
			title
            description
		}
	}
`;