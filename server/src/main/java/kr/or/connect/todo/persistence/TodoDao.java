package kr.or.connect.todo.persistence;

import java.awt.print.Book;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;


import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

import kr.or.connect.todo.domain.Todo;
import kr.or.connect.todo.service.TodoService;



@Repository
public class TodoDao {
	private NamedParameterJdbcTemplate jdbc;
	private SimpleJdbcInsert insertAction;
	
	public TodoDao(DataSource dataSource) {
		this.jdbc = new NamedParameterJdbcTemplate(dataSource);
		this.insertAction = new SimpleJdbcInsert(dataSource)
				.withTableName("todo")
				.usingGeneratedKeyColumns("id");
	}
	
	private RowMapper<Todo> rowMapper = BeanPropertyRowMapper.newInstance(Todo.class);

	// DB에 시간을 넣기 위해서
	SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.KOREA);
	Date CurrentTime = new Date();
	String dTime = formatter.format (CurrentTime);
	long currentMillis = System.currentTimeMillis()%1000;
	String result_currentMillis = String.format("%03d", currentMillis);
	String finalTime = dTime + "."+ result_currentMillis ;
	
	
	public List<Todo> selectAll() {
		Map<String,Object> params = Collections.emptyMap();
		return jdbc.query(TodoSqls.SELECT_ALL , params, rowMapper);
		
	}
	
	public void insertTodo(HttpServletRequest request) {
		Map<String, String> params = new HashMap<>();
		params.put("TODO", request.getParameter("todo") );
		params.put("DATE", finalTime);
		jdbc.update(TodoSqls.INSERT_TODO, params);	
		
	}
	
	
	public void deleteTodo(@RequestBody Map<String,String> request) {
		Map<String, Integer> params = new HashMap<>();
		Integer id = Integer.parseInt(request.get("id"));
		System.out.println(id);
		params.put("id", id);
		jdbc.update(TodoSqls.DELETE_TODO, params);
	}
	
	public void putTodo(@RequestBody Map<String,String> request) {
		Map<String, Integer> params = new HashMap<>();
		Integer id = Integer.parseInt(request.get("id"));
		Integer completed = Integer.parseInt(request.get("completed"));
		System.out.println(id);
		System.out.println(completed);
		params.put("id",id);
		params.put("completed",completed);
		jdbc.update(TodoSqls.PUT_TODO, params);
	}
	
	
	
}
