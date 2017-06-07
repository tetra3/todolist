package kr.or.connect.todo.persistence;

public class TodoSqls {
	static final String DELETE_TODO =
			"DELETE FROM todo WHERE ID=:id";
	
	static final String SELECT_ALL =
			"SELECT * FROM todo order by id";
	
	static final String INSERT_TODO =
			"INSERT INTO todo VALUES(null,:TODO,0,default)";

	static final String PUT_TODO =
			"UPDATE todo SET COMPLETED =:completed WHERE ID=:id";
	
	static final String COMPLETED_TODO =
			"DELETE FROM todo WHERE COMPLETED=1";

}
