// /utils/handleError.ts
export const handleError = (response: Response): void => {
    if (!response.ok) {
      switch (response.status) {
        case 400:
          throw new Error('Bad request.');
        case 404:
          throw new Error('Resource not found.');
        case 500:
          throw new Error('Internal server error.');
        default:
          throw new Error('An unknown error occurred.');
      }
    }
  };
  