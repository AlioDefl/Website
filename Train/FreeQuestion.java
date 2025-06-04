package Train;

public class FreeQuestion extends Question {

    private String correctAnswer;

    public FreeQuestion(String statement, String correctAnswer) {
        super(statement);
        this.correctAnswer = correctAnswer;
    }

    @Override
    public String getAnswer() {
        return this.correctAnswer;
    }

    @Override
    public int getSubjectSize() {
        return this.statement.length();
    }
}
