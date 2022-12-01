/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const test = /* GraphQL */ `
  subscription Test($userID: String!) {
    test(userID: $userID) {
      id
      name
      description
      userID
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo {
    onCreateTodo {
      id
      name
      description
      userID
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo {
    onUpdateTodo {
      id
      name
      description
      userID
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo {
    onDeleteTodo {
      id
      name
      description
      userID
      createdAt
      updatedAt
    }
  }
`;
