package Train;

import java.util.Set;
import java.util.HashSet;
import java.util.Map;
import java.util.HashMap;

public class Base {

    private Set<Question> pool;
    private Map<Tag, Set<Question>> byReference;

    public Base() {
        this.pool = new HashSet<>();
        this.byReference = new HashMap<>();
    }

    public Set<Question> getPool() {
        return this.pool;
    }

    public Map<Tag, Set<Question>> getByReference() {
        return this.byReference;
    }

    public void addElement(Tag ref, Question elt) {
        this.pool.add(elt);
        Set<Question> questionsForTag = this.byReference.get(ref);
        if (questionsForTag == null) {
            questionsForTag = new HashSet<>();
            this.byReference.put(ref, questionsForTag);
        }
        questionsForTag.add(elt);
    }

    public void removeElement(Question elt) {
        this.pool.remove(elt);

        for (Set<Question> questionsForTag : this.byReference.values()) {
            questionsForTag.remove(elt);
        }
        
    }
} 