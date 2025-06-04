package Train;

import java.util.HashSet;
import java.util.Set;

public abstract class Question {
    private final int ID;
    protected String statement;
    private Set<Tag> tags;
    private static int cpt = 0;


    public Question(String statement){
        this.ID = cpt++;
        this.statement = statement;
        this.tags = new HashSet<>();
    }

    public int getID(){
        return this.ID;
    }

    public Set<Tag> getTags(){
        return this.tags;
    }

    public void addTag(Tag t){
        this.tags.add(t);
    }

    public void addTag(String tag){
        addTag(Tag.valueOf(tag.toUpperCase()));
    }

    public String toString(){
        return "[" + this.ID + "] [" + this.tags + "]" + this.statement;
    }

    public abstract String getAnswer();
    public abstract int getSubjectSize();
}
