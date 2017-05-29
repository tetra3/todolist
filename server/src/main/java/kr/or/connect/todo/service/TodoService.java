package kr.or.connect.todo.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;

import kr.or.connect.todo.domain.Todo;
import kr.or.connect.todo.persistence.TodoDao;

@Service
public class TodoService {
	private TodoDao dao;
	
	public TodoService(TodoDao dao) {
		this.dao = dao;
	}
	
	public List<Todo> findAll() {
		return dao.selectAll();
	}
	
	public void insertTodo(HttpServletRequest request) {
		dao.insertTodo(request);
	}
	
	public void deleteTodo(HttpServletRequest request) {
		dao.deletetodo(request);
	}
	
}
