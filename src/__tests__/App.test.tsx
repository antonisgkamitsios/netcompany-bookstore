import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { expect, it } from 'vitest';
import { routes } from '~/App';
import { FilterProvider } from '~/contexts/FilterProvider';
import { QueryClientWrapper, render } from '~/test/utilities';
import { books } from '~/books.json';

function renderWithRouter({ route = '/' }: { route?: string } = {}) {
  // because I made the decision to create a BrowserProvider, I cannot simply render my app and wrap it with a MemoryRouter
  // so i have to import my routes and instantiate a memory router
  const router = createMemoryRouter(routes, { initialEntries: [route] });

  return {
    ...render(<RouterProvider router={router} />, {
      wrapper: ({ children }) => (
        <QueryClientWrapper>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FilterProvider>{children}</FilterProvider>
          </LocalizationProvider>
        </QueryClientWrapper>
      ),
    }),
  };
}

it('should display all the routes of app', async () => {
  const { user } = renderWithRouter();

  // verify page content for the default route
  expect(screen.getByText(/Welcome to our bookstore/)).toBeInTheDocument();

  // verify that the user navigates to the search page after clicking the link
  await user.click(screen.getByRole('link', { name: /find the book/i }));
  expect(screen.getByText(/search your book/i)).toBeInTheDocument();

  // verify that the user navigates to add book page after clicking the "add" button
  await user.click(screen.getByTestId('add-book'));
  expect(screen.getByText(/add book/i)).toBeInTheDocument();

  // go back to the search
  await user.click(screen.getByRole('link', { name: /search/i }));

  // wait for the books to load
  await waitFor(() => expect(screen.getByTestId('book-list')).toBeInTheDocument());

  // verify that the user can navigate to the details page
  const firstBook = screen.getByRole('link', { name: books[0].title });

  await user.click(firstBook);

  expect(screen.getByText('Details')).toBeInTheDocument();
});

it('should create a book and then the book is displayed correctly in the details page', async () => {
  const { user } = renderWithRouter({ route: '/search/add-book' });

  const submitButton = screen.getByRole('button', { name: /create book/i });
  const inputs = {
    titleInput: screen.getByLabelText(/title/i),
    descriptionInput: screen.getByLabelText(/description/i),
    authorInput: screen.getByLabelText(/author/i),
    publishedInput: screen.getByLabelText(/published/i),
    publisherInput: screen.getByLabelText(/publisher/i),
    pagesInput: screen.getByLabelText(/pages/i),
    isbnInput: screen.getByLabelText(/isbn/i),
  };

  const inputValues = {
    title: 'One Piece, Vol. 1',
    description: 'One piece',
    author: 'Eiichiro Oda',
    published: '22-07-1997',
    publisher: 'Viz Media, Subs. of Shogakukan Inc',
    pages: '216',
    isbn: '9781569319017',
  };

  await user.type(inputs.titleInput, inputValues.title);
  await user.type(inputs.descriptionInput, inputValues.description);
  await user.type(inputs.authorInput, inputValues.author);
  await user.type(inputs.publishedInput, inputValues.published);
  await user.type(inputs.publisherInput, inputValues.publisher);
  await user.type(inputs.pagesInput, inputValues.pages);
  await user.type(inputs.isbnInput, inputValues.isbn);

  await user.click(submitButton);

  // wait for the submit to be successful
  await waitFor(() => expect(screen.getByTestId('success-message')).toBeInTheDocument());

  // navigate to the search page
  await user.click(screen.getByRole('link', { name: /search/i }));

  // wait for the books to load
  await waitFor(() => expect(screen.getByTestId('book-list')).toBeInTheDocument());

  // verify that the book is on the screen
  const createdBook = screen.getByText(inputValues.title);
  expect(createdBook).toBeInTheDocument();

  await user.click(createdBook);

  // wait for the details to load
  await waitForElementToBeRemoved(screen.getByTestId('loading'));

  // verify that all the values the user typed made it to the details page as is
  (Object.keys(inputValues) as (keyof typeof inputValues)[]).forEach((key) => {
    expect(screen.getByText(inputValues[key])).toBeInTheDocument();
  });
});

it('should display the 404 page when landing on a bad page', async () => {
  renderWithRouter({ route: '/something-bad' });

  expect(screen.getByText(/looks like the page you are looking for is not found/i)).toBeInTheDocument();
});
