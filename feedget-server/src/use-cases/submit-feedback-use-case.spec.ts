import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedbackUseCase = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe('Submit feedback', () => {
  it('should submit feedback', async () => {
    await expect(submitFeedbackUseCase.execute({
      type: 'BUG',
      comment: 'Example comment',
      screenshot: 'data:image/png;base64 screenshot.png'
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able submit feedback without type', async () => {
    await expect(submitFeedbackUseCase.execute({
      type: '',
      comment: 'Example comment',
      screenshot: 'data:image/png;base64 screenshot.png'
    })).rejects.toThrow();
  });

  it('should not be able submit feedback without comment', async () => {
    await expect(submitFeedbackUseCase.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64 screenshot.png'
    })).rejects.toThrow();
  });

  it('should not be able submit feedback with an invalid screenshot', async () => {
    await expect(submitFeedbackUseCase.execute({
      type: 'BUG',
      comment: 'Test comment',
      screenshot: 'screenshot.png'
    })).rejects.toThrow();
  });
});
