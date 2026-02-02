import { gql } from "@apollo/client";

export const ADD_BOOK = gql`
	mutation AddBook($title: String!, $description: String, $coverUrl: String, $releaseDate: Date, $authorIds: [ID!]!, $categoryIds: [ID], $publisherId: ID!) {
		addBook(title: $title, description: $description, coverUrl: $coverUrl, releaseDate: $releaseDate, authorIds: $authorIds, categoryIds: $categoryIds, publisherId: $publisherId) {
			title
      		description
			coverUrl
			releaseDate
			author {
				id
				firstName
        		lastName
			}
			category {
				id
				name
			}
			publisher {
				id
				name
				description
			}
		}
	}
`;

export const ADD_AUTHOR = gql`
	mutation AddAuthor($firstName: String!, $lastName: String!, $biography: String) {
		addAuthor(firstName: $firstName, lastName: $lastName, biography: $biography) {
			id
			firstName
            lastName
			biography
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

export const ADD_PUBLISHER = gql`
	mutation AddPublisher($name: String!, $description: String) {
		addPublisher(name: $name, description: $description) {
			id
			name
			description
		}
	}
`