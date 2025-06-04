package Train;

import java.util.List;
import java.util.ArrayList;
import java.util.Collections;

public class ChoiceQuestion extends Question {

    private List<String> propositions;

    public ChoiceQuestion(String statement, List<String> propositions, int correctAnswerIndex) {
        super(statement);
        this.propositions = propositions;
        if (correctAnswerIndex >= 0 && correctAnswerIndex < propositions.size()) {
            Collections.swap(this.propositions, 0, correctAnswerIndex);
        }
    }

    @Override
    public String getAnswer() {
        if (!this.propositions.isEmpty()) {
            return this.propositions.get(0);
        } else {
            return ""; 
        }
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("[").append(getID()).append("] ").append(statement).append(" ");

        List<String> shuffledPropositions = new ArrayList<>(this.propositions);
        Collections.shuffle(shuffledPropositions);

        for (int i = 0; i < shuffledPropositions.size(); i++) {
            sb.append(i + 1).append(")").append(shuffledPropositions.get(i));
            if (i < shuffledPropositions.size() - 1) {
                sb.append(" "); 
            }
        }

        return sb.toString();
    }

    @Override
    public int getSubjectSize() {
        StringBuilder sb = new StringBuilder();
        sb.append(statement).append(" ");

        for (int i = 0; i < propositions.size(); i++) {
            sb.append(i + 1).append(")").append(propositions.get(i));
            if (i < propositions.size() - 1) {
                sb.append(" ");
            }
        }

        return sb.length();
    }
}