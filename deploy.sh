
ssh -o StrictHostKeyChecking=no $EC2_USERNAME@$EC2_PUBLIC_DNS << 'EOF'
  docker pull $DOCKER_USERNAME/todolist
  docker stop todo_list_app || true
  docker rm todo_list_app || true
  docker run -d -p 3000:3000 --name todo_list_app $DOCKER_USERNAME/todolist
EOF
