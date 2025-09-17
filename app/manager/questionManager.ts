import { Answer } from "../page";

export default class QuestionManager {
  public async getQuestions(userID: string) {
    const response = await fetch(
      `https://fhc-api.onrender.com/questions?user=${userID}`
    );

    if (!response.ok) {
      console.error("Cannot fetch questions");
    }
    const data = await response.json();

    return data;
  }

  public async submitAnswers(userID: string, answers: Answer[]) {
    const response = await fetch(
      `https://fhc-api.onrender.com/submissions?user=${userID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers }),
      }
    );
    if (!response.ok) {
      console.error("Failed to submit the answers");
    }
  }

  public async seeResults(userID: string) {
    const response = await fetch(
      `https://fhc-api.onrender.com/submissions?user=${userID}`
    );
    if (!response.ok) {
      console.error("There was an error fetching the results");
    }
  }
}
