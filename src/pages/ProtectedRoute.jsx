import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext"
import { useEffect } from "react";

function ProtectedRoute({ children }) {
	const { isAuthenticated } = useAuth();
	const naviage = useNavigate();

	useEffect(function () {
		if (!isAuthenticated) naviage('/')
	}, [isAuthenticated, naviage])

	return isAuthenticated ? children : null;
}
export default ProtectedRoute;
