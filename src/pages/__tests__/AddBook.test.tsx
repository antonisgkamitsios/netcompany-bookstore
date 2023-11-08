import { PropsWithChildren } from 'react';

import { screen, waitFor } from '@testing-library/react';
import { expect, it } from 'vitest';
import { UserEvent } from '@testing-library/user-event';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AddBook } from '../AddBook';

import { QueryClientWrapper, render } from '~/test/utilities';
import { server } from '~/test/setup';

import { Response } from 'miragejs';

function wrapper({ children }: PropsWithChildren) {
  return (
    <QueryClientWrapper>
      <LocalizationProvider dateAdapter={AdapterDayjs}>{children}</LocalizationProvider>
    </QueryClientWrapper>
  );
}

// happy path :)
it('should create a book', async () => {
  const { user } = render(<AddBook />, { wrapper });

  const inputs = {
    titleInput: screen.getByLabelText(/title/i),
    descriptionInput: screen.getByLabelText(/description/i),
    authorInput: screen.getByLabelText(/author/i),
    publishedInput: screen.getByLabelText(/published/i),
    publisherInput: screen.getByLabelText(/publisher/i),
    pagesInput: screen.getByLabelText(/pages/i),
    isbnInput: screen.getByLabelText(/isbn/i),
  };

  const submitButton = screen.getByRole('button', { name: /create book/i });

  expect(inputs.pagesInput).not.toHaveValue();
  await user.type(inputs.titleInput, 'One Piece, Vol. 1');
  await user.type(inputs.descriptionInput, 'One piece');
  await user.type(inputs.authorInput, 'Eiichiro Oda');
  await user.type(inputs.publishedInput, '22-07-1997');
  await user.type(inputs.publisherInput, 'Viz Media, Subs. of Shogakukan Inc');
  await user.type(inputs.pagesInput, '216');
  await user.type(inputs.isbnInput, '9781569319017');

  await user.click(submitButton);

  expect(submitButton).toBeDisabled();

  // wait for the submit to take place
  await waitFor(() => expect(submitButton).toBeEnabled());
  // expect all the values to have been cleared

  // verify that the values are cleared after the submit
  (Object.keys(inputs) as (keyof typeof inputs)[]).forEach((key) => {
    expect(inputs[key]).not.toHaveValue();
  });

  expect(screen.getByTestId('success-message')).toBeInTheDocument();
});

async function expectInputError(user: UserEvent, input: HTMLElement, value: string) {
  const submitButton = screen.getByRole('button', { name: /create book/i });

  await user.type(input, value);
  await user.click(submitButton);

  expect(input).not.toBeValid();

  await user.clear(input);
}

// sad patch :(
it('should display the correct errors', async () => {
  const { user } = render(<AddBook />, { wrapper });

  const inputs = {
    titleInput: screen.getByLabelText(/title/i),
    descriptionInput: screen.getByLabelText(/description/i),
    authorInput: screen.getByLabelText(/author/i),
    publishedInput: screen.getByLabelText(/published/i),
    publisherInput: screen.getByLabelText(/publisher/i),
    pagesInput: screen.getByLabelText(/pages/i),
    isbnInput: screen.getByLabelText(/isbn/i),
  };
  const submitButton = screen.getByRole('button', { name: /create book/i });

  await user.click(submitButton);

  // expect all the required fields not to be valid
  (Object.keys(inputs) as (keyof typeof inputs)[]).forEach((key) => {
    if (key !== 'descriptionInput') {
      expect(inputs[key]).not.toBeValid();
    }
  });

  await expectInputError(user, inputs.titleInput, 'Small');

  await expectInputError(
    user,
    inputs.titleInput,
    `A very large title, definitely this 
    will be more than one hundred and twenty 
    characters by the time I finish this very long title`
  );

  await expectInputError(user, inputs.descriptionInput, 'not capitalized');

  await expectInputError(
    user,
    inputs.descriptionInput,
    `A very large title, definitely this will be more than one hundred and twenty 
    characters by the time I finish this very long title A very large title, definitely 
    this will be more than one hundred and twenty characters by the time I finish this 
    very long title A very large title, definitely this will be more than one hundred 
    and twenty characters by the time I finish this very long title A very large title, 
    definitely this will be more than one hundred and twenty characters by the time I 
    finish this very long title A very large title, definitely this will be more than 
    one hundred and twenty characters by the time I finish this very long title`
  );

  await expectInputError(user, inputs.publisherInput, '<5');
  await expectInputError(
    user,
    inputs.publisherInput,
    `Very long publisher more than 60 chars 
  Very long publisher more than 60 chars
  Very long publisher more than 60 chars
  Very long publisher more than 60 chars`
  );

  await expectInputError(user, inputs.pagesInput, '-1');
  await expectInputError(user, inputs.pagesInput, '10000');

  await expectInputError(user, inputs.isbnInput, 'Something more than thirteen characters');
});

// sad path :(
it('should display error message when server goes bad', async () => {
  // make the server to throw 500
  server.post('/books', () => new Response(500));

  const { user } = render(<AddBook />, { wrapper });

  const inputs = {
    titleInput: screen.getByLabelText(/title/i),
    descriptionInput: screen.getByLabelText(/description/i),
    authorInput: screen.getByLabelText(/author/i),
    publishedInput: screen.getByLabelText(/published/i),
    publisherInput: screen.getByLabelText(/publisher/i),
    pagesInput: screen.getByLabelText(/pages/i),
    isbnInput: screen.getByLabelText(/isbn/i),
  };

  const submitButton = screen.getByRole('button', { name: /create book/i });

  expect(inputs.pagesInput).not.toHaveValue();
  await user.type(inputs.titleInput, 'One Piece, Vol. 1');
  await user.type(inputs.descriptionInput, 'One piece');
  await user.type(inputs.authorInput, 'Eiichiro Oda');
  await user.type(inputs.publishedInput, '22-07-1997');
  await user.type(inputs.publisherInput, 'Viz Media, Subs. of Shogakukan Inc');
  await user.type(inputs.pagesInput, '216');
  await user.type(inputs.isbnInput, '9781569319017');

  await user.click(submitButton);

  expect(submitButton).toBeDisabled();

  await waitFor(() => expect(screen.getByTestId('error-message')).toBeInTheDocument());

  // verify that the values are cleared after the submit
  (Object.keys(inputs) as (keyof typeof inputs)[]).forEach((key) => {
    expect(inputs[key]).toHaveValue();
  });
});
