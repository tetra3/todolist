package kr.or.connect.todo.persistence;

public class TodoSqls {
	static final String DELETE_TODO =
			"DELETE FROM todo WHERE ID=:id";
	
	static final String SELECT_ALL =
			"SELECT * FROM todo";
	
	static final String INSERT_TODO =
			"INSERT INTO TODO VALUES(ID.nextval,:TODO,0,:DATE)";

	static final String PUT_TODO =
			"UPDATE TODO SET COMPLETED =:completed WHERE ID=:id";
	
	static final String COMPLETED_TODO =
			"DELETE FROM todo WHERE COMPLETED=1";

}
