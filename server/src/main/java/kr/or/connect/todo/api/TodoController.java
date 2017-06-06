package kr.or.connect.todo.api;

import java.util.Collection;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.connect.todo.domain.Todo;
import kr.or.connect.todo.service.TodoService;

@RestController
@RequestMapping("/api/todos")
public class TodoController {
	private final TodoService service;
	
	@Autowired
	public TodoController(TodoService service) {
		this.service = service;
	}
	
	@GetMapping
	List<Todo> readList() {
		System.out.println("read");
		return service.findAll();
	}
	
	@PostMapping
	void insertTodo(HttpServletRequest request) {
		System.out.println("test insert");
		service.insertTodo(request);
		
	}
	
	@DeleteMapping
	void deleteTodo(@RequestBody Map<String, String> request) {
		
		service.deleteTodo(request);
	}
	
	@PutMapping
	void putTodo(@RequestBody Map<String, String> request) {
		service.putTodo(request);
	}
	
	@DeleteMapping("/all")
	void deleteCompletedTodo() {
		
		service.deleteCompletedTodo();
	}
	
	
	
	
	
	
}
