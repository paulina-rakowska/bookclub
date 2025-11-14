import { gql } from "@apollo/client";

export const ADD_BOOK = gql`
	mutation AddBook($title: String!, $description: String, $cover: Boolean!, $authorIds: [ID!]!, $categoryIds: [ID]) {
		addBook(title: $title, description: $description, cover: $cover, authorIds: $authorIds, categoryIds: $categoryIds) {
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
	mutation AddCategory($name: String!) {
		addCategory(name: $name) {
			id
			name
		}
	}
`;

export const ADD_SLIDE = gql`
	mutation AddSlide($title: String!, $subtitle: String, $description: String, $linkText: String!, $linkHref: String!, $image: String!) {
		addSlide(title: $title, subtitle: $subtitle, description: $description, linkText: $linkText, linkHref: $linkHref, image: $image) {
			id
			title
			subtitle
			description
			linkText
			linkHref
			image
		}
	}
`;